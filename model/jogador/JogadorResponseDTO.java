package br.edu.ifpr.bsi.sistemaclubesoft.model.jogador;

public record JogadorResponseDTO(
                    Long codigo,
                    String nome,
                    String dataNascimento,
                    String numeroCamisa,
                    float pesoKG,
                    int alturaCM,
                    String descricao,
                    String disponivel,
                    String pernaDominante,
                    String posicao) {
}
