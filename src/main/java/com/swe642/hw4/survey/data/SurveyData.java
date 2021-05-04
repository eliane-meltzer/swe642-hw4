package com.swe642.hw4.survey.data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.LinkedHashMap;
import java.util.Objects;
import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;


@Entity(name="SURVEYDATA")
@Data
@Table(name="SURVEYDATA")
public final class SurveyData {
	
	//member variables
  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private  Long id;
	@Column(name="STUDENTNAME")
	private String name = ""; 
	@Column(name="STUDENTID")
	private String studentid = ""; 
	@Column(name="STREET")
	private String street = "";
	@Column(name="CITY")
	private String city = ""; 
	@Column(name="STATE")
	private String state = ""; 
	@Column(name="ZIP")
	private String zip = ""; 
	@Column(name="TELNUM")
	private String telnum = ""; 
	@Column(name="EMAIL")
	private String email = ""; 
	@Column(name="URL")
	private String url = ""; 
	@Column(name="HEARD")
	private String heard = ""; 
	@Column(name="GRADMON")
	private String gradmon = ""; 
	@Column(name="GRADYEAR")
	private String gradyear = ""; 
	@Column(name="RECOMMEND")
	private String recommend = ""; 
	@Column(name="COMMENTS")
	private String comments = "";
	@Column(name="SURVEYDATE")
	private Date surveydate = new Date(0);
	@Column(name="LIKED")
	private String[] liked = new String[6];

	/*
	 * requires non-null linked hashmap containing keys for each field
	 */
	public static SurveyData factory(LinkedHashMap<String, Object> map) {
		
    String name = ""; 
		String studentID = ""; 
		Date surveydate = new Date(0); 
		String street = "";
		String city = ""; 
		String state = ""; 
		String zip = "";
		String telNum = "";
		String email = ""; 
		String url = ""; 
		String[] liked = new String[6]; 
		String heard = ""; 
		String gradMon = "";
		String gradYear = "";
		String recommend = ""; 
		String comments = "";
		if(map.containsKey("name")) {name = (String) map.get("name");}		
		if(map.containsKey("studentid")) {studentID = (String) map.get("studentid");}
		if(map.containsKey("surveydate")) {      
			String strDt = (String) map.get("surveydate");
			LocalDateTime dt;
			try {
				dt = LocalDateTime.parse(strDt);
			} catch(Exception e) {
				dt = LocalDateTime.now();
			}     
			surveydate = new Date(dt.atZone(ZoneId.of("America/New_York")).toInstant().toEpochMilli());
		}
		if(map.containsKey("street")) {street = (String) map.get("street");}
		if(map.containsKey("city")) {city = (String) map.get("city");}
		if(map.containsKey("state")) {state = (String) map.get("state");}
		if(map.containsKey("zip")) {zip = (String) map.get("zip");}
		if(map.containsKey("telnum")) {telNum = (String) map.get("telnum");}
		if(map.containsKey("email")) {email = (String) map.get("email");}
		if(map.containsKey("url")) {url = (String) map.get("url");}
		if(map.containsKey("liked")) {

			liked = (String[]) map.get("liked");

//			List<String> temp = (ArrayList<String>) map.get("liked");
//			liked = temp.toArray(new String[0]);
		}
		if(map.containsKey("heard")) {heard = (String) map.get("heard");}
		if(map.containsKey("gradmon")) {gradMon = (String) map.get("gradmon");}
		if(map.containsKey("gradyear")) {gradYear = (String) map.get("gradyear");}
		if(map.containsKey("recommend")) {recommend = (String) map.get("recommend");}
		if(map.containsKey("comments")) {comments = (String) map.get("comments");}
		
		return new SurveyData(name, studentID, surveydate, street, city, state, zip, telNum, email, url, liked, heard, gradMon, gradYear, recommend, comments);
	}

	//empty constructor
	SurveyData() {}
	//paramaterized constructor
	SurveyData(String name, String studentID, Date surveyDate, String street, String city, String state, String zip, String telNum,
			String email, String url, String[] liked, String heard, String gradMon, String gradYear, String recommend, String comments) {
		this.id = null;
		this.name = name;
		this.studentid = studentID;
		this.surveydate = surveyDate;
		this.street = street;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.telnum = telNum;
		this.email = email;
		this.url = url;
		this.liked = liked;
		this.heard = heard;
		this.gradmon = gradMon;
		this.gradyear = gradYear;
		this.recommend = recommend;
		this.comments = comments;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		SurveyData d = (SurveyData) o;
		return Objects.equals(id, d.id) &&
				Objects.equals(name, d.name) &&
				Objects.equals(studentid, d.studentid) &&
				Objects.equals(surveydate, d.surveydate) &&
				Objects.equals(street, d.street) &&
				Objects.equals(city, d.city) &&
				Objects.equals(state, d.state) &&
				Objects.equals(zip, d.zip) && 
				Objects.equals(telnum, d.telnum) &&
				Objects.equals(email, d.email) &&
				Objects.equals(url, d.url) &&
				Objects.equals(liked, d.liked) &&
				Objects.equals(heard, d.heard) &&
				Objects.equals(gradmon, d.gradmon) &&
				Objects.equals(gradyear, d.gradyear) &&
				Objects.equals(recommend, d.recommend) &&
				Objects.equals(comments, d.comments);
		
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id, name, studentid, surveydate, street, city, state, zip,
    telnum, email, url, liked, heard, gradmon, gradyear, recommend, comments);
	}
	
	@Override
	public String toString() {
		return "ID: "+id+"\nStudentName: "+name+"\nStudentID: "+studentid+"\nSurvey date: "
			      +surveydate+"\nStreet Address: "+street+"\nCity: "+city+"\nState: "+state+"\nZip: "
			      +zip+"\nTelephone: "+telnum+"\nEmail: "+email+"\nHomepage: "
			      +url+"\nLiked: "+liked+"\nHeard: "+heard+"\nGrad Month: "+gradmon+
			      "\nGrad Year: "+gradyear+"\nRecommend: "+recommend+"\nComments: "+comments;
	}


}
