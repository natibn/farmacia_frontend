import { useState, useEffect } from "react";
import ProdutoContext from "./ProdutoContext";
import { getProdutosAPI, getProdutosPorCodigoAPI, 
    deleteProdutosPorCodigoAPI, cadastraProdutoAPI} from "../../../servicos/ProdutoServico";
import Tabela from "./Tabela";
import Form from "./Form";

function Produto (){

    const [alerta, setAlerta] = useState ({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo: 0, nome: "", descricao:"", quantidade_estoque:0, ativo:false, valor:0, data_cadastro:null});

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({status: "", message: ""});
        setObjeto({codigo: 0, nome: "", descricao:"", quantidade_estoque:0, ativo:false, valor:0, data_cadastro:null});
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({status: "", message: ""});
        setObjeto(await getProdutosPorCodigoAPI(codigo));
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? 'PUT' : 'POST';
        try{
            console.log(objeto)
           let retornoAPI = await cadastraProdutoAPI(objeto, metodo);
            setAlerta({status: retornoAPI.status, message: retornoAPI.message});
            setObjeto(retornoAPI.objeto);
            if(!editar){
                setEditar(true);
            }
        }catch (err){
            console.log(err)
        }

        recuperaProdutos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name]: value});
    }

    const recuperaProdutos = async () => {
        setListaObjetos(await getProdutosAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')){
            let retornoAPI = await deleteProdutosPorCodigoAPI(codigo);
            setAlerta({status : retornoAPI.status, message : retornoAPI.message});
            recuperaProdutos();
        }
    }

    useEffect(() => {
        console.log("mensagem");
        recuperaProdutos();
    }, []);

    return (
        <ProdutoContext.Provider value={{alerta, listaObjetos, remover, objeto, editar,
        acaoCadastrar, handleChange, novoObjeto, editarObjeto}}>
            <Tabela/>
            <Form/>
        </ProdutoContext.Provider>
    )
}

export default Produto;