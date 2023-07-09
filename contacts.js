import fs from "fs/promises";
import path from "path";

import { nanoid } from "nanoid";

const contactsPath = path.resolve("db/contacts.json");

const readFile = async () => {
	const buf = await fs.readFile(contactsPath);
	const contacts = JSON.parse(buf);
	return contacts;
};

const writeFile = async data => {
	await fs.writeFile(contactsPath, JSON.stringify(data));
};

const listContacts = async () => {
	const contacts = await readFile();
	return contacts;
};

const getContactById = async id => {
	const allContacts = await readFile();
	const movie = allContacts.find(el => el.id === id);
	return movie || null;
};

const addContact = async contactData => {
	const allContacts = await readFile();
	const newUser = { id: nanoid(), ...contactData };
	allContacts.push(newUser);
	writeFile(allContacts);
	return newUser;
};

const removeContact = async id => {
	const allContacts = await readFile();
	const idx = allContacts.findIndex(el => el.id === id);

	if (idx === -1) {
		return null;
	}

	const [result] = allContacts.splice(idx, 1);
	writeFile(allContacts);
	return result;
};

export { listContacts, getContactById, addContact, removeContact };
