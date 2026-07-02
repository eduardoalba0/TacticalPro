package br.edu.ifpr.bsi.sistemaclubesoft.controller;

import br.edu.ifpr.bsi.sistemaclubesoft.model.torneio.TorneioDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.torneio.TorneioRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.services.TorneioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/torneios")
@CrossOrigin(origins = "http://localhost:5173")
public class TorneioController {

    @Autowired
    private TorneioService torneioService;

    @GetMapping
    public ResponseEntity<List<TorneioDetailDTO>> listar(){
        List<TorneioDetailDTO> torneios = this.torneioService.listar();
        return ResponseEntity.ok(torneios);
    }


    @PostMapping
    public ResponseEntity<TorneioDetailDTO> inserir(@RequestBody TorneioRequestDTO request){
        TorneioDetailDTO torneioSalvo = torneioService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(torneioSalvo);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<TorneioDetailDTO> atualizar(@PathVariable Long codigo, @RequestBody TorneioRequestDTO request){
        TorneioDetailDTO torneioAtualizado = torneioService.atualizar(codigo, request);
        return ResponseEntity.ok(torneioAtualizado);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo){
        torneioService.excluir(codigo);
    }
}
