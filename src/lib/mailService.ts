import nodemailer from 'nodemailer';
import mustache from 'mustache';
import fs from 'fs';
import path from 'path';

export async function sendMail(
	subject: string,
	toEmail: string,
	bodyText: string,
	payload?: {
		[key: string]: string | number | Date | boolean | null | undefined;
	}
) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NODEMAILER_EMAIL,
			pass: process.env.NODEMAILER_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.NODEMAILER_EMAIL,
		to: toEmail,
		subject,
		html: mustache.render(bodyText, {
			...payload,
			appUrl: process.env.APP_URL,
		}),
	};

	await new Promise((resolve, reject) => {
		// send email
		transporter.sendMail(mailOptions, (err, response) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
}
