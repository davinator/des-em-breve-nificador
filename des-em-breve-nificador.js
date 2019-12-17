const LOADING_ID = 'DesEmBreveNificador';
const PARSED_CLASS = 'qa-debn-parsed';
const REMOVED_CLASS = 'qa-debn-removed';

const get_loading_elements = () => document.querySelectorAll(`div#${LOADING_ID}`);

const toggle_loading = (add = true) => {
  const loadings = get_loading_elements();

  if (add && loadings.length > 0 || !add && !loadings.length) {
    return;
  }

  if (add) {
    const loading = document.createElement('div');
    loading.innerHTML = 'Aguardando carregamento para remover imóveis "em breve"';
    loading.setAttribute('id', LOADING_ID);
    
    document.querySelector("html").appendChild(loading);
    return;
  }

  loadings.forEach(node => node.remove());
};

const mark_appartment = (node) => {
  // Prevents the link from working
  node.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });

  // Adds the styling and message
  node.classList.add(REMOVED_CLASS);

  const flag = document.createElement('span');
  flag.innerHTML = 'Indisponível/Esquece/👎🏻/💣';
  flag.classList.add(REMOVED_CLASS + '-flag');

  node.appendChild(flag);
  
}

const mark_em_breve_appartments = () => {
  // Queries for elements not parsed yet
  document.querySelectorAll('main a[href*="imovel/"]:not(.' + PARSED_CLASS + ')').forEach(node => {
    // Adds the parsed class
    node.classList.add(PARSED_CLASS);

    // Searches and removes unavailables
    const matches = node.textContent.match('(em breve)|(indispon.ve(l)|(is))/gi');
    if (!matches) {
      return;
    }

    mark_appartment(node);
  });
}

/* Begin */

toggle_loading(true);

window.addEventListener('load', function (e) {
  toggle_loading(false);
  mark_em_breve_appartments();

  window.addEventListener('DOMSubtreeModified', function (e) {
    mark_em_breve_appartments();
  });
});
