package br.edu.ifpr.bsi.sistemaclubesoft.model.escalacao;

import br.edu.ifpr.bsi.sistemaclubesoft.model.GenericModel;
import br.edu.ifpr.bsi.sistemaclubesoft.model.partida.Partida;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_escalacao")
public class Escalacao extends GenericModel {
    @Column(name = "esquema_tatico)")
    private String esquemaTatico;
    @Column(name = "instrucoes")
    private String istrucoes;
    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "partida_id")
    private Partida partida;
}
