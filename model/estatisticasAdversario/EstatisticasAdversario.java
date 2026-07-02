package br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticasAdversario;

import br.edu.ifpr.bsi.sistemaclubesoft.model.GenericModel;
import br.edu.ifpr.bsi.sistemaclubesoft.model.timeAdversario.TimeAdversario;
import br.edu.ifpr.bsi.sistemaclubesoft.model.torneio.Torneio;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_estatisticasAdversario")
public class EstatisticasAdversario extends GenericModel {
    @Column(name = "posse_media_bola")
    private String posseMediaBola;
    @Column(name = "gols_sofridos")
    private String golsSofridos;
    @Column(name = "formacao_comum")
    private String formacaoComum;
    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "timeAdversario_id")
    private TimeAdversario timeAdversario;
    @ManyToOne
    @JoinColumn(name = "torneio_id")
    private Torneio torneio;
}
