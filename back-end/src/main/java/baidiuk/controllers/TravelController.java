package baidiuk.controllers;

import baidiuk.entities.Travel;
import baidiuk.repository.PassengerRepository;
import baidiuk.repository.TravelRepository;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@RestController    // This means that this class is a Controller
@RequestMapping(path = "/api") // This means URL's start with /demo (after Application path)
public class TravelController {
    @Autowired
    private TravelRepository travelRepository;
    @Autowired
    private PassengerRepository passengerRepository;

    @PostMapping(path = "/addTravel") // Map ONLY GET Requests
    @ResponseBody
    public ResponseEntity addNewTravel(@RequestBody JsonNode jsonBody) {

        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        Travel n = new Travel();
        String stringDate = jsonBody.get("date").asText();

        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");

        java.util.Date date = null;
        try {
            date = sdf1.parse(stringDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }


        if (StringUtils.isEmpty(stringDate))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

        n.setDate(date);
        travelRepository.save(n);
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/getAllTravels")
    @ResponseBody
    public Iterable<Travel> getAll() {
        // This returns a JSON or XML with the users
        return travelRepository.findAll();
    }

    @GetMapping(path = "/getPastTravels")
    @ResponseBody
    public Iterable<Travel> getPastTravels() {
        return travelRepository.getPastTravels();
    }

    @GetMapping(path = "/getUpcomingTravels")
    @ResponseBody
    public Iterable<Travel> getUpcomingTravels() {
        return travelRepository.getUpcomingTravels();
    }

    @GetMapping(path = "/delTravelWithId")
    @ResponseBody
    public ResponseEntity delTravelWithId(@RequestParam int id) {

        travelRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}