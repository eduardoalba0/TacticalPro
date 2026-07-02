package br.edu.ifpr.bsi.sistemaclubesoft.model.partida;

import br.edu.ifpr.bsi.sistemaclubesoft.model.GenericModel;
import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticas.Estatisticas;
import br.edu.ifpr.bsi.sistemaclubesoft.model.timeAdversario.TimeAdversario;
import br.edu.ifpr.bsi.sistemaclubesoft.model.torneio.Torneio;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tb_partida")
public class Partida extends GenericModel {
    @Column(name = "data")
    private Date data;
    @Column(name = "hora")
    private String hora;
    @Column(name = "local")
    private String local;
    @Column(name = "mando_de_campo")
    private String mandoDeCampo;
    @Column(name = "resultado_final")
    private String resultadoFinal;
    @ManyToOne
    @JoinColumn(name="torneio_id")
    private Torneio torneio;
    @ManyToOne
    @JoinColumn(name="timeAdversario_id")
    private TimeAdversario timeAdversario;
    @OneToMany(mappedBy = "partida",cascade = CascadeType.ALL,fetch = FetchType.LAZY,orphanRemoval = true)
    private List<Estatisticas> Estatisticas;

}
