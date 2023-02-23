const common = {
}

common.formatPrice = price => {
    
    const text = String(price);
    const format = text.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    return format;
}

export default common;