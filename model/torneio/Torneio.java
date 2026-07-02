package br.edu.ifpr.bsi.sistemaclubesoft.model.torneio;

import br.edu.ifpr.bsi.sistemaclubesoft.model.GenericModel;
import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticasAdversario.EstatisticasAdversario;
import br.edu.ifpr.bsi.sistemaclubesoft.model.partida.Partida;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tb_torneio")
public class Torneio extends GenericModel {
    @Column(name = "nome")
    private String nome;
    @Column(name = "temporada")
    private String temporada;
    @Column(name = "organizador")
    private String organizador;
    @Column(name = "tipo")
    private String tipo;
    @OneToMany(mappedBy = "torneio",cascade = CascadeType.ALL,fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Partida> partidas;
    @OneToMany(mappedBy = "torneio",cascade = CascadeType.ALL,fetch = FetchType.LAZY, orphanRemoval = true)
    private List<EstatisticasAdversario> estatisticasAdversarios;

}
