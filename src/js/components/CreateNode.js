const create = (type, styling, ...classList) => {

    const node = document.createElement(type);
    Object.entries(styling).forEach(([key, value]) => {

        node.style[key] = value;

    });
    [...classList].forEach((el) => {

        node.classList.add(el);

    });
    return node;

};

export default create;
