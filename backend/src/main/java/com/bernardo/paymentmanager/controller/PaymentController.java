package com.bernardo.paymentmanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernardo.paymentmanager.model.Payment;
import com.bernardo.paymentmanager.service.PaymentService;



@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*")

public class PaymentController {

    private final PaymentService  paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    @GetMapping()
    public List<Payment> getPayments() {
    
        return paymentService.getAllPayments();
    }

    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentService.createPayment(payment);
    }

    @GetMapping("/total")
    public Double calcularTotalDosPagamentos() {
        return paymentService.calcularTotalDosPagamentos();
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
    }

    @GetMapping("/conta/{id}")
    public Payment getPayment(@PathVariable Long id){
        return paymentService.getPayment(id);
    }

    @PutMapping("/{id}")
    public Payment updatePayment(@PathVariable Long id, @RequestBody Payment payment){
        return paymentService.updatePayment(id, payment);
    }
}