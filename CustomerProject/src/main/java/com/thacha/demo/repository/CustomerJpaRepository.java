package com.thacha.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thacha.demo.model.Customer;
@Repository
public interface CustomerJpaRepository extends JpaRepository<Customer, Integer> {

}
