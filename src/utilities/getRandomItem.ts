import items from '../data/items';

const getRandomItem = () => {
    const keys = Object.keys(items);
    const values = Object.values(items);

    return values[Math.floor(Math.random() * keys.length)]
}

export default getRandomItem;