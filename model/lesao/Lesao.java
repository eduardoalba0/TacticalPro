package br.edu.ifpr.bsi.sistemaclubesoft.model.lesao;

import br.edu.ifpr.bsi.sistemaclubesoft.model.GenericModel;
import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.Jogador;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_lesao")
public class Lesao extends GenericModel {
    @Column(name = "tipo_lesao")
    private String tipoLesao;
    @Column(name = "gravidade")
    private String gravidade;
    @Column(name = "inicio")
    private String inicio;
    @Column(name = "fim")
    private String fim;
    @Column(name = "previsao_retorno")
    private String previsaoRetorno;
    @Column(name = "Observacao_DP",length = 1000)
    private String observacaoDP;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="jogador_id")
    private Jogador jogador;
}
