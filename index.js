import fs from "fs/promises";

const path = "db/contacts.json";

const getAll = async () => {
	const buf = await fs.readFile(path);
	const contacts = JSON.parse(buf);
	return contacts;
};

const getById = async id => {
	const allContacts = await getAll();
	return console.log(allContacts.find(el => el.id === id));
};

const addContact = async (name, phone, email) => {
	const allContacts = await getAll();
	const newContact = { name, phone, email };
	allContacts.push(newContact);
	await fs.writeFile(path, JSON.stringify(allContacts));
	return console.log("newContact", newContact);
};

addContact("an", "380", "email");
