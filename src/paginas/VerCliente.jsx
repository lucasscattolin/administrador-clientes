import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
	const [cliente, setCliente] = useState({});
	const [cargando, setCargando] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		const obtenerClienteAPI = async () => {
			try {
				const url = `${import.meta.env.VITE_API_URL}/${id}`;
				const respuesta = await fetch(url);
				const resultado = await respuesta.json();

				setCliente(resultado);
			} catch (error) {
				console.log(error);
			}

			setCargando(false);
		};

		obtenerClienteAPI();
	});

	return cargando ? (
		<Spinner />
	) : Object.keys(cliente).length === 0 ? (
		<p>No hay resultados</p>
	) : (
		<div>
			<>
				<h1 className="font-black text-4xl text-blue-900">Cliente</h1>
				<p className="mt-3">Información del cliente.</p>

				{cliente.nombre && (
					<p className="text-gray-600 text-4xl mt-10">
						<span className="text-gray-800 uppercase font-bold">Nombre:</span> {cliente.nombre}
					</p>
				)}

				{cliente.mail && (
					<p className="text-gray-600 text-2xl">
						<span className="text-gray-800 uppercase font-bold">Mail:</span> {cliente.mail}
					</p>
				)}

				{cliente.telefono && (
					<p className="text-gray-600 text-2xl">
						<span className="text-gray-800 uppercase font-bold">Teléfono:</span> {cliente.telefono}
					</p>
				)}

				{cliente.empresa && (
					<p className="text-gray-600 text-2xl">
						<span className="text-gray-800 uppercase font-bold">Empresa:</span> {cliente.empresa}
					</p>
				)}

				{cliente.notas && (
					<p className="text-gray-600 text-2xl">
						<span className="text-gray-800 uppercase font-bold">Notas:</span> {cliente.notas}
					</p>
				)}
			</>
		</div>
	);
};

export default VerCliente;
