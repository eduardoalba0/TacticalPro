package br.edu.ifpr.bsi.sistemaclubesoft.controller;

import br.edu.ifpr.bsi.sistemaclubesoft.model.tecnico.TecnicoDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.tecnico.TecnicoRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.services.TecnicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tecnicos")
@CrossOrigin(origins = "http://localhost:5173")
public class TecnicoController {

    @Autowired
    private TecnicoService tecnicoService;

    @GetMapping
    public ResponseEntity<List<TecnicoDetailDTO>> listar(){
        List<TecnicoDetailDTO> tecnicos = this.tecnicoService.listar();
        return ResponseEntity.ok(tecnicos);
    }


    @PostMapping
    public ResponseEntity<TecnicoDetailDTO> inserir(@RequestBody TecnicoRequestDTO request){
        TecnicoDetailDTO tecnicoSalvo = tecnicoService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(tecnicoSalvo);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<TecnicoDetailDTO> atualizar(@PathVariable Long codigo, @RequestBody TecnicoRequestDTO request){
        TecnicoDetailDTO tecnicoAtualizado = tecnicoService.atualizar(codigo, request);
        return ResponseEntity.ok(tecnicoAtualizado);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo){
        tecnicoService.excluir(codigo);
    }
}
