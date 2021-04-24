package com.swe642.hw4.survey.reports;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Value;
import lombok.With;

@Value
@Data
@With(AccessLevel.PACKAGE)
public class AllReports {

  public final Long id;
  public final String studentid;
	
}
