package br.edu.ifpr.bsi.sistemaclubesoft.controller;

import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.JogadorDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.JogadorRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.services.JogadorService;
import br.edu.ifpr.bsi.sistemaclubesoft.facade.JogadorFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jogadores")
@CrossOrigin(origins = "http://localhost:5173")
public class JogadorController {

    @Autowired
    private JogadorService jogadorService;

    @Autowired
    private JogadorFacade jogadorFacade;

    @GetMapping
    public ResponseEntity<List<JogadorDetailDTO>> listarJogadores() {
        List<JogadorDetailDTO>jogadores = this.jogadorService.listar();
        return ResponseEntity.ok(jogadores);
    }


    @PostMapping
    public ResponseEntity<JogadorDetailDTO> inserir(@RequestBody JogadorRequestDTO request){
        JogadorDetailDTO jogadorSalvo = jogadorService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(jogadorSalvo);
    }

    @PostMapping("/com-contrato")
    public ResponseEntity<JogadorDetailDTO> inserirComContrato(@RequestBody JogadorRequestDTO request){
        JogadorDetailDTO jogadorSalvo = jogadorFacade.criarJogadorComContrato(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(jogadorSalvo);
    }

@PutMapping(value = "/{codigo}",consumes = "multipart/form-data")
    public ResponseEntity<JogadorDetailDTO> atualizar(@PathVariable Long codigo,
                                                      @RequestPart("dados") JogadorRequestDTO request){
            JogadorDetailDTO jogadorAtualizado = jogadorService.atualizar(codigo, request);
            return ResponseEntity.ok(jogadorAtualizado);
        }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo){
        jogadorService.excluir(codigo);
    }

}
