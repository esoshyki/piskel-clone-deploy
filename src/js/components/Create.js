const create = (type, className, styling) => {

    const node = document.createElement(type);

    if (styling) {
        Object.entries(styling).forEach(([key, value]) => {

            node.style[key] = value;
    
        });
    }

    node.className = className;

    return node;

};

export default create;
