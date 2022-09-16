import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alerta from "./Alerta";

const Formulario = () => {
	const nuevoClienteSchema = Yup.object().shape({
		nombre: Yup.string()
			.min(3, "El nombre es muy corto")
			.max(40, "El nombre es muy largo")
			.required("El nombre del cliente es obligatorio"),
		empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
		mail: Yup.string().email("Mail no válido").required("El mail es obligatorio"),
		telefono: Yup.number().integer("Número no válido").positive('Número no válido').typeError("Número no válido"),
	});

	const handleSubmit = (valores) => {
		console.log(valores);
	};

	return (
		<div className="bg.white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
			<h1 className="text-gray-600 font-bold text-xl uppercase">Agregar Cliente</h1>

			<Formik
				initialValues={{
					nombre: "",
					empresa: "",
					mail: "",
					telefono: "",
					notas: "",
				}}
				onSubmit={(values) => handleSubmit(values)}
				validationSchema={nuevoClienteSchema}
			>
				{({ errors, touched }) => {
					console.log(touched);
					return (
						<Form className="mt-10">
							<div>
								<label className="text-gray-800" htmlFor="nombre">
									Nombre
								</label>
								<Field
									id="nombre"
									type="text"
									className="mt-2 block w-full p-3 bg-gray-100"
									placeholder="Nombre del cliente..."
									name="nombre"
								/>
								{errors.nombre && touched.nombre ? <Alerta>{errors.nombre}</Alerta> : null}
							</div>

							<div>
								<label className="text-gray-800" htmlFor="empresa">
									Empresa
								</label>
								<Field
									id="empresa"
									className="mt-2 block w-full p-3 bg-gray-100"
									placeholder="Nombre del cliente..."
									name="empresa"
								/>
								{errors.empresa && touched.empresa ? <Alerta>{errors.empresa}</Alerta> : null}
							</div>

							<div>
								<label className="text-gray-800" htmlFor="email">
									Mail
								</label>
								<Field
									type="email"
									id="email"
									className="mt-2 block w-full p-3 bg-gray-100"
									placeholder="Mail del cliente..."
									name="mail"
								/>
								{errors.mail && touched.mail ? <Alerta>{errors.mail}</Alerta> : null}
							</div>

							<div>
								<label className="text-gray-800" htmlFor="telefono">
									Teléfono
								</label>
								<Field
									type="tel"
									id="telefono"
									className="mt-2 block w-full p-3 bg-gray-100"
									placeholder="Teléfono del cliente..."
									name="telefono"
								/>
								{errors.telefono && touched.telefono ? <Alerta>{errors.telefono}</Alerta> : null}
							</div>

							<div>
								<label className="text-gray-800" htmlFor="notas">
									Notas
								</label>
								<Field
									as="textarea"
									type="text"
									id="notas"
									className="mt-2 block w-full p-3 bg-gray-100 h-40"
									placeholder="Notas del cliente..."
									name="notas"
								/>
							</div>

							<input
								type="submit"
								value="Agregar Cliente"
								className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
							/>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default Formulario;
