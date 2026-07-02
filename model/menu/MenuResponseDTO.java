package br.edu.ifpr.bsi.sistemaclubesoft.model.menu;

import java.util.List;

public record MenuResponseDTO(String titulo,
                              List<String> opcoes) {
}

