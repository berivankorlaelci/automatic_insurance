package com.bdo.automaticinsurance.service;

import com.bdo.automaticinsurance.model.UserInfo;
import com.bdo.automaticinsurance.repository.UserInfoRepository;
import org.camunda.bpm.engine.DecisionService;
import org.camunda.bpm.engine.variable.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserInfoService {
    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private DecisionService decisionService;

    public UserInfo evaluateCredit(UserInfo userInfo) {
        // Kullanıcının girdiği cevapları DMN tablosuna gönderiyoruz
        Map<String, Object> variables = Variables.createVariables()
                .putValue("yas", userInfo.getYas())
                .putValue("saglik", userInfo.getSaglik())
                .putValue("meslek", userInfo.getMeslek())
                .putValue("gelir", userInfo.getGelir())
                .putValue("sigara", userInfo.getSigara())
                .putValue("alkol", userInfo.getAlkol())
                .putValue("gecmis", userInfo.getGecmis())
                .putValue("medeni", userInfo.getMedeni())
                .putValue("malvarligi", userInfo.getMalvarligi());

        // Camunda DMN tablosundan karar alıyoruz
        String decisionResult = decisionService.evaluateDecisionTableByKey("automatic_insurance", variables) // DMN tablosunun key'i!
                .getSingleResult()
                .getSingleEntry()
                .toString();

        // Kararı kaydediyoruz
        userInfo.setKrediSonucu(decisionResult);

        // Database'e kaydet ve döndür
        return userInfoRepository.save(userInfo);
    }
}

