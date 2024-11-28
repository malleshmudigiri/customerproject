package com.thacha.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thacha.demo.model.Customer;
@Repository
public interface CustomerJpaRepository extends JpaRepository<Customer, Integer> {

    List<Customer> findByCustomerNameIgnoreCaseAndGenderIgnoreCase(String customerName, String gender);
    List<Customer> findByCustomerNameIgnoreCase(String customerName);
    List<Customer> findByGender(String gender);
  
}
