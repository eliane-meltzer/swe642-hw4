package com.swe642.hw4.survey.reports;

import lombok.AccessLevel;
import lombok.Value;
import lombok.With;

@Value
@With(AccessLevel.PACKAGE)
public class AllReports {

	public Long id;
	public String studentid;

}
