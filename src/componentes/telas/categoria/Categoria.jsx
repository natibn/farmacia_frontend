import { useState, useEffect } from "react";
import CategoriaContext from "./CategoriaContext";
import { getCategoriasAPI, getCategoriasPorCodigoAPI, 
    deleteCategoriasPorCodigoAPI, cadastraCategoriaAPI} from "../../../servicos/CategoriaServico";
import Tabela from "./Tabela";
import Form from "./Form";

function Categoria (){

    const [alerta, setAlerta] = useState ({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo:0, nome:""});

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({status: "", message: ""});
        setObjeto({codigo: 0, nome: ""});
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({status: "", message: ""});
        setObjeto(await getCategoriasPorCodigoAPI(codigo));
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? 'PUT' : 'POST';
        try{
            let retornoAPI = await cadastraCategoriaAPI(objeto, metodo);
            setAlerta({status: retornoAPI.status, message: retornoAPI.message});
            setObjeto(retornoAPI.objeto);
            if(!editar){
                setEditar(true);
            }
        }catch (err){
            console.log(err)
        }

        recuperaCategorias();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name]: value});
    }

    const recuperaCategorias = async () => {
        setListaObjetos(await getCategoriasAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')){
            let retornoAPI = await deleteCategoriasPorCodigoAPI(codigo);
            setAlerta({status : retornoAPI.status, message : retornoAPI.message});
            recuperaCategorias();
        }
    }

    useEffect(() => {
        console.log("mensagem");
        recuperaCategorias();
    }, []);

    return (
        <CategoriaContext.Provider value={{alerta, listaObjetos, remover, objeto, editar,
        acaoCadastrar, handleChange, novoObjeto, editarObjeto}}>
            <Tabela/>
            <Form/>
        </CategoriaContext.Provider>
    )
}

export default Categoria;