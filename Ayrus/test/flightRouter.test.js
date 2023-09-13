const express = require('express');
const request = require('supertest');
const flightRouter = require("../routes/flightRouter");
const app = require('../app');
const Flight = require('../models/Flight');

jest.mock('../models/Flight');

describe('Flight Routes',()=>{
    const mockFlight = {
        flightNumber: 'F123',
        origin: 'City A',
        destination: 'City B',
        date: '2023-08-14T18:30:00Z',
        seatsAvailable: 150,
        startTime: '2023-08-15T04:30:00Z',
        endTime: '2023-08-15T06:30:00Z',
    }

    it('should return filtered flights', async ()=>{
        Flight.find.mockResolvedValue([mockFlight]);

        const response = await request(app).get('/flights').query({
            origin: 'City A',
            destination: 'City B',
            passengers: 50,
            date: '2023-08-14T18:30:00Z'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0].flightNumber).toBe('F123');
    });

    it('should add a new flight', async ()=>{
        Flight.prototype.save.mockResolvedValue(mockFlight);

        const response = await request(app).post('/flights').send(mockFlight);

        expect(response.statusCode).toBe(201);
        expect(response.body.flightNumber).toBe('F123');

    });

});

