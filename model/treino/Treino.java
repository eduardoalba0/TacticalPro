package br.edu.ifpr.bsi.sistemaclubesoft.model.treino;

import br.edu.ifpr.bsi.sistemaclubesoft.model.GenericModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_treino")
public class Treino extends GenericModel {
    @Column(name = "foco_tatico")
    private String focoTatico;
    @Column(name = "intensidade")
    private String intensidade;
    @Column(name = "clima")
    private String clima;
    @Column(name = "descricao")
    private String descricao;


}
