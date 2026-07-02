package br.edu.ifpr.bsi.sistemaclubesoft.controller;

import br.edu.ifpr.bsi.sistemaclubesoft.model.contrato.ContratoRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.contrato.ContratoResponseDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.services.ContratoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contratos")
@CrossOrigin(origins = "http://localhost:5173")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    @GetMapping
    public ResponseEntity<List<ContratoResponseDTO>> listar(){
        List<ContratoResponseDTO> contratos = this.contratoService.listar();
        return ResponseEntity.ok(contratos);
    }


    @PostMapping
    public ResponseEntity<ContratoResponseDTO> inserir(@RequestBody ContratoRequestDTO request){
        ContratoResponseDTO contratoSalvo = contratoService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(contratoSalvo);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<ContratoResponseDTO> atualizar(@PathVariable Long codigo, @RequestBody ContratoRequestDTO request){
        ContratoResponseDTO contratoAtualizado = contratoService.atualizar(codigo, request);
        return ResponseEntity.ok(contratoAtualizado);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo){
        contratoService.excluir(codigo);
    }
}
