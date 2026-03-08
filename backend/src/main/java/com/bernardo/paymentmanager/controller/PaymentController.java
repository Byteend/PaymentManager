package com.bernardo.paymentmanager.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.bernardo.paymentmanager.model.Payment;
import com.bernardo.paymentmanager.service.PaymentService;



@RestController
@RequestMapping("/payments")
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
}