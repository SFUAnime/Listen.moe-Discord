const { Collection } = require('discord.js');

const Item = require('../../models/Item');
const StoreItem = require('./StoreItem');

const backgroundStoreItems = new Collection();

class BackgroundStore {
	static registerItem(item) {
		backgroundStoreItems.set(item.name, item);
	}

	static getItem(itemName) {
		return backgroundStoreItems.get(itemName);
	}

	static getItems() {
		return backgroundStoreItems;
	}
}

Item.findAll().then(items => {
	for (const item of items) BackgroundStore.registerItem(new StoreItem(item.name, item.desc, item.price, item.image));
});

module.exports = BackgroundStore;
