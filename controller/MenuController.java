package br.edu.ifpr.bsi.sistemaclubesoft.controller;

import br.edu.ifpr.bsi.sistemaclubesoft.model.menu.MenuResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuController {

    @GetMapping
    public ResponseEntity<MenuResponseDTO> menu() {
        return ResponseEntity.ok(new MenuResponseDTO(
                "Menu principal",
                List.of(
                        "jogadores",
                        "tecnicos",
                        "contratos",
                        "partidas",
                        "lesoes",
                        "treinos",
                        "torneios",
                        "timesAdversarios",
                        "estatisticas",
                        "estatisticasAdversarios",
                        "escalacoes"
                )
        ));
    }
}

