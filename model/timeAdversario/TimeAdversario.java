package br.edu.ifpr.bsi.sistemaclubesoft.model.timeAdversario;

import br.edu.ifpr.bsi.sistemaclubesoft.model.GenericModel;
import br.edu.ifpr.bsi.sistemaclubesoft.model.contrato.Contrato;
import br.edu.ifpr.bsi.sistemaclubesoft.model.partida.Partida;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tb_time_Adversario")
public class TimeAdversario extends GenericModel {
    @Column(name = "nome")
    private String nome;
    @Column(name = "pontos_fortes")
    private String pontos_fortes;
    @Column(name = "pontos_fracos")
    private String pontos_fracos;
    @Column(name = "tecnico_adversario")
    private String tecnicoAdversario;
    @OneToMany(mappedBy = "timeAdversario",cascade = CascadeType.ALL,fetch = FetchType.LAZY,orphanRemoval = true)
    private List<Partida> partidas;

}
