import React from 'react';
import FormRegister from './Form';
import path from 'path';
import fs from 'fs';

export default function Register() {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<FormRegister />
		</div>
	);
}
