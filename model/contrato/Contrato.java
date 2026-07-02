package br.edu.ifpr.bsi.sistemaclubesoft.model.contrato;


import br.edu.ifpr.bsi.sistemaclubesoft.model.GenericModel;
import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.Jogador;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_contrato")
public class Contrato extends GenericModel {
    @Column(name = "salario")
    private float salario;
    @Column(name = "tempo_contrato")
    private int tempoDeContrato;
}
