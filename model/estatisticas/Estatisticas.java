package br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticas;

import br.edu.ifpr.bsi.sistemaclubesoft.model.GenericModel;
import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.Jogador;
import br.edu.ifpr.bsi.sistemaclubesoft.model.partida.Partida;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_estatisticas")
public class Estatisticas extends GenericModel {
    @Column(name = "gols")
    private int gols;
    @Column(name = "assistencias")
    private int assistencias;
    @Column(name = "minutos_jogados")
    private float minutosJogados;
    @Column(name = "jogos")
    private int jogos;
    @Column(name = "passes")
    private int passes;
    @Column(name = "desarmes")
    private int desarmes;
    @Column(name = "cartoes_amarelos")
    private int cartoesAmarelos;
    @Column(name = "cartoes_vermelhos")
    private int cartoesVermelhos;
    @Column(name = "faltas_jogador")
    private int faltasJogador;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "jogador_id")
    private Jogador jogador;

    @ManyToOne
    @JoinColumn(name = "partida_id")
    private Partida partida;
}
