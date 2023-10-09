import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import ProdutoContext from "./ProdutoContext";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(ProdutoContext);

    return (
        <div className="modal fade" id="modalEdicao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Produto</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="mb-3">
                                <label for="txtCodigo" className="form-label">Código</label>
                                <input type="number" className="form-control" id="txtCodigo" placeholder="name@example.com"
                                    readOnly name="codigo" value={objeto.codigo}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label for="txtNome" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="txtNome" placeholder="Informe o nome"
                                    required name="nome" value={objeto.nome}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label for="txtDescricao" className="form-label">Descrição</label>
                                <input type="text" className="form-control" id="txtDescricao" placeholder="Informe a descrição"
                                    required name="descricao" value={objeto.descricao}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label for="txtQtdEstoque" className="form-label">Quantidade Estoque</label>
                                <input type="number" className="form-control" id="txtQtdEstoque" placeholder="Informe a quatidade no estoque"
                                    required name="quantidade_estoque" value={objeto.quantidade_estoque}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label for="ativo" className="form-label">Ativo</label>
                                <select className="form-select" id="ativo" aria-label="Default select example"
                                required name="ativo" value={objeto.ativo}
                                onChange={handleChange}>
                                    <option selected>Produto ativo?</option>
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="txtValor" className="form-label">Valor</label>
                                <input type="number" className="form-control" id="txtValor" placeholder="Informe o valor"
                                    required name="valor" value={objeto.valor}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label for="txtDataCadastro" className="form-label">Data Cadastro</label>
                                <input type="date" className="form-control" id="txtDataCadastro"
                                    required name="data_cadastro" value={objeto.data_cadastro}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-primary">Salvar <i className="bi bi-save"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;