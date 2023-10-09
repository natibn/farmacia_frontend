import { useContext } from "react";
import CategoriaContext from "./CategoriaContext";
import Alerta from "../../comuns/Alerta";

function Tabela(){

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(CategoriaContext);

    return (
        <div style={{padding : '20px'}}>
            <h1>Categorias</h1>
            <Alerta alerta={alerta}/>
            <button type="button" className="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#modalEdicao"
            onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h1>Nenhuma categoria encontrada</h1>}
            {listaObjetos.length > 0 && 
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{textAlign : 'center'}}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.codigo}>                                     
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={()=>
                                        editarObjeto(objeto.codigo)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" 
                                        title="Remover" onClick={() => remover(objeto.codigo)}>
                                            <i className="bi bi-trash3"></i>
                                        </button>
                                    </td>
                                    <th scope="row">{objeto.codigo}</th>
                                    <td>{objeto.nome}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Tabela;