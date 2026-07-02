package br.edu.ifpr.bsi.sistemaclubesoft.controller;

import br.edu.ifpr.bsi.sistemaclubesoft.model.lesao.LesaoRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.lesao.LesaoResponseDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.services.LesaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lesoes")
@CrossOrigin(origins = "http://localhost:5173")
public class LesaoController {

    @Autowired
    private LesaoService lesaoService;

    @GetMapping
    public ResponseEntity<List<LesaoResponseDTO>> listar(){
        List<LesaoResponseDTO> lesoes = this.lesaoService.listar();
        return ResponseEntity.ok(lesoes);
    }


    @PostMapping
    public ResponseEntity<LesaoResponseDTO> inserir(@RequestBody LesaoRequestDTO request){
        LesaoResponseDTO lesaoSalva = lesaoService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(lesaoSalva);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<LesaoResponseDTO> atualizar(@PathVariable Long codigo, @RequestBody LesaoRequestDTO request){
        LesaoResponseDTO lesaoAtualizada = lesaoService.atualizar(codigo, request);
        return ResponseEntity.ok(lesaoAtualizada);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo){
        lesaoService.excluir(codigo);
    }

}
