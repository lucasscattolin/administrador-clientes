import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
	const navigate = useNavigate();

	const nuevoClienteSchema = Yup.object().shape({
		nombre: Yup.string()
			.min(3, "El nombre es muy corto")
			.max(40, "El nombre es muy largo")
			.required("El nombre del cliente es obligatorio"),
		empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
		mail: Yup.string().email("Mail no válido").required("El mail es obligatorio"),
		telefono: Yup.number()
			.integer("Número no válido")
			.positive("Número no válido")
			.typeError("Número no válido"),
	});

	const handleSubmit = async (valores) => {
		try {
			let respuesta;
			if (cliente.id) {
				// Editando registro
				const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;

				respuesta = await fetch(url, {
					method: "PUT",
					body: JSON.stringify(valores),
					headers: {
						"Content-Type": "application/json",
					},
				});
			} else {
				// Nuevo registro
				const url = import.meta.env.VITE_API_URL;

				respuesta = await fetch(url, {
					method: "POST",
					body: JSON.stringify(valores),
					headers: {
						"Content-Type": "application/json",
					},
				});
			}

			await respuesta.json();
			navigate("/clientes");
		} catch (error) {
			console.log(error);
		}
	};

	return cargando ? (
		<Spinner />
	) : (
		<div className="bg.white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
			<h1 className="text-gray-600 font-bold text-xl uppercase text-center">
				{cliente.nombre ? `Editar Cliente` : `Agregar Cliente`}
			</h1>

			<Formik
				initialValues={{
					nombre: cliente.nombre ?? "",
					empresa: cliente.empresa ?? "",
					mail: cliente.mail ?? "",
					telefono: cliente.telefono ?? "",
					notas: cliente.notas ?? "",
				}}
				enableReinitialize={true}
				onSubmit={async (values, { resetForm }) => {
					await handleSubmit(values);

					resetForm();
				}}
				validationSchema={nuevoClienteSchema}
			>
				{({ errors, touched }) => {
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
								value={cliente.nombre ? `Editar Cliente` : `Agregar Cliente`}
								className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
							/>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

Formulario.defaultProps = {
	cliente: {},
	cargando: false,
};

export default Formulario;
