package com.bernardo.paymentmanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
}