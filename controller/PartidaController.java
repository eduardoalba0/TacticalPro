package br.edu.ifpr.bsi.sistemaclubesoft.controller;

import br.edu.ifpr.bsi.sistemaclubesoft.model.partida.PartidaDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.partida.PartidaRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.services.PartidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/partidas")
@CrossOrigin(origins = "http://localhost:5173")
public class PartidaController {

    @Autowired
    private PartidaService partidaService;

    @GetMapping
    public ResponseEntity<List<PartidaDetailDTO>> listar(){
        List<PartidaDetailDTO> partidas = this.partidaService.listar();
        return ResponseEntity.ok(partidas);
    }


    @PostMapping
    public ResponseEntity<PartidaDetailDTO> inserir(@RequestBody PartidaRequestDTO request){
        PartidaDetailDTO partidaSalva = partidaService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(partidaSalva);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<PartidaDetailDTO> atualizar(@PathVariable Long codigo, @RequestBody PartidaRequestDTO request){
        PartidaDetailDTO partidaAtualizada = partidaService.atualizar(codigo, request);
        return ResponseEntity.ok(partidaAtualizada);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo){
        partidaService.excluir(codigo);
    }
}
