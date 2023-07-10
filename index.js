import { listContacts, getContactById, addContact, removeContact } from "./contacts.js";

import { Command } from "commander";
const program = new Command();
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case "list":
			const list = await listContacts();
			console.log("list", list);
			break;

		case "get":
			const userById = await getContactById(id);
			console.log("userById", userById);
			break;

		case "add":
			const addedUser = await addContact({ id, name, email, phone });
			console.log("addedUser", addedUser);
			break;

		case "remove":
			const deletedUser = await removeContact(id);
			console.log("deletedUser", deletedUser);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
};

invokeAction(argv);
