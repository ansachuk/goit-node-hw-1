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
			console.table(list);
			break;

		case "get":
			try {
				if (!id) {
					throw new Error("Please enter ID. Type -i <type>, or --id <type> ");
				}
				const userById = await getContactById(id);
				console.log("userById", userById);
				break;
			} catch (e) {
				console.warn(e.message);
				break;
			}

		case "add":
			try {
				if (!name) {
					throw new Error("Please enter name. Type -n <type>, or --name <type> ");
				} else if (!email) {
					throw new Error("Please enter email. Type -e <type>, or --email <type> ");
				} else if (!phone) {
					throw new Error("Please enter phone. Type -p <type>, or --phone <type> ");
				}
				const addedUser = await addContact({ name, email, phone });
				console.log("addedUser", addedUser);
				break;
			} catch (e) {
				console.warn(e.message);
				break;
			}

		case "remove":
			try {
				if (!id) {
					throw new Error("Please enter ID. Type -i <type>, or --id <type> ");
				}

				const deletedUser = await removeContact(id);
				console.log("deletedUser", deletedUser);
				break;
			} catch (e) {
				console.warn(e.message);
				break;
			}

		default:
			console.warn("\x1B[31m Unknown action type! Please, enter -a list | get | add | remove, or --action list | get | add | remove");
	}
};

invokeAction(argv);
