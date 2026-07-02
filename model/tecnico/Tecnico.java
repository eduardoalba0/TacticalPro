package br.edu.ifpr.bsi.sistemaclubesoft.model.tecnico;

import br.edu.ifpr.bsi.sistemaclubesoft.model.GenericModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_tecnico")
public class Tecnico extends GenericModel {
    @Column(name = "nome_tecnico")
    private String nome;
    @Column(name = "CPF")
    private String cpf;
    @Column(name = "data_nascimento")
    private String dataNascimento;
    @Column(name = "email")
    private String email;
    @Column(name = "senha")
    private String senha;
}