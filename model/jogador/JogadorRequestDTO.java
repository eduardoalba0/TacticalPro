package br.edu.ifpr.bsi.sistemaclubesoft.model.jogador;

import br.edu.ifpr.bsi.sistemaclubesoft.model.contrato.ContratoResponseDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.lesao.LesaoResponseDTO;

import java.util.List;

public record JogadorRequestDTO(Long codigo,
                                String nome,
                                String dataNascimento,
                                String numeroCamisa,
                                Float pesoKG,
                                Integer alturaCM,
                                String descricao,
                                String disponivel,
                                String pernaDominante,
                                String posicao,
                                ContratoResponseDTO contrato,
                                List<LesaoResponseDTO> lesoes
) {
}
