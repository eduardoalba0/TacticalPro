package br.edu.ifpr.bsi.sistemaclubesoft.controller;


import br.edu.ifpr.bsi.sistemaclubesoft.model.escalacao.EscalacaoDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.escalacao.EscalacaoRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.services.EscalacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/escalacoes")
@CrossOrigin(origins = "http://localhost:5173")
public class EscalacaoController {

    @Autowired
    private EscalacaoService escalacaoService;

    @GetMapping
    public ResponseEntity<List<EscalacaoDetailDTO>> listar(){
        List<EscalacaoDetailDTO> escalacoes = this.escalacaoService.listar();
        return ResponseEntity.ok(escalacoes);
    }


    @PostMapping
    public ResponseEntity<EscalacaoDetailDTO> inserir(@RequestBody EscalacaoRequestDTO request){
        EscalacaoDetailDTO escalacaoSalva = escalacaoService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(escalacaoSalva);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<EscalacaoDetailDTO> atualizar(@PathVariable Long codigo, @RequestBody EscalacaoRequestDTO request){
        EscalacaoDetailDTO escalacaoAtualizada = escalacaoService.atualizar(codigo, request);
        return ResponseEntity.ok(escalacaoAtualizada);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo){
        escalacaoService.excluir(codigo);
    }
}
