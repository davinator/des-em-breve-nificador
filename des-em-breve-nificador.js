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
    console.log("Lets add the loading");
    const loading = document.createElement('div');
    loading.innerHTML = 'Aguardando carregamento para remover imóveis "em breve"';
    loading.setAttribute('id', LOADING_ID);
    document.querySelector("html").appendChild(loading);
    return;
  }

  // Remove the loading div
  loadings.forEach(node => node.remove());
};

const mark_appartment = (node) => {
  node.classList.add(REMOVED_CLASS);

  const flag = document.createElement('div');
  flag.innerHTML = 'Não existe';
  flag.classList.add(REMOVED_CLASS + '_flag');

  node.appendChild(flag);
}

const mark_em_breve_appartments = () => {
  document.querySelectorAll('main a[href*="imovel/"]:not(.' + PARSED_CLASS + ')').forEach(node => {
    node.classList.add(PARSED_CLASS);

    const matches = node.textContent.match('(em breve)|(indispon[ií]ve(l)|(is))/gi');
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
