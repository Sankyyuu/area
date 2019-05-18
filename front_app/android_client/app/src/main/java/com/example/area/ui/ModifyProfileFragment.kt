package com.example.area.ui

import android.content.Context
import android.graphics.Point
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.Toast
import com.example.area.R
import com.github.kittinunf.fuel.httpPut
import kotlinx.android.synthetic.main.modify_profile.*
import org.json.JSONObject

class ModifyProfileFragment: Fragment() {

    lateinit var username: String
    lateinit var email: String

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.modify_profile, container, false)
    }

    override fun onStart() {
        super.onStart()

        val wm = context?.getSystemService(Context.WINDOW_SERVICE) as WindowManager
        val display = wm.defaultDisplay

        val size = Point()
        display.getSize(size)
        val width = size.x

        /////

        profileAvatarMod?.layoutParams?.height = width / 3

        usernameFieldMod?.setText(username)
        emailFieldMod?.setText(email)

        modifyButtonMod?.setOnClickListener {
            val username = usernameFieldMod.text.toString()
            val email = emailFieldMod.text.toString()
            val password = passwordFieldMod.text.toString()
            val password2 = passwordConfirmField.text.toString()

            if (password == password2) {
                val rootObject = JSONObject()
                rootObject.put("username", username)
                rootObject.put("email", email)
                rootObject.put("password", password)

                val prefs = activity?.getSharedPreferences("area_user", Context.MODE_PRIVATE)
                val uid = prefs?.getString("uid", "")?.replace("\"", "")

                "https://areaserver.herokuapp.com/user/$uid".httpPut()
                        .header("Content-Type" to "application/json")
                        .body(rootObject.toString())
                        .responseString { _, _, result ->

                            result.fold({ d ->
                                //do something with data
                                println("RECEIVED SUCCESS:$d")
                                Toast.makeText(activity, "Succesfully modified", Toast.LENGTH_SHORT).show()
                            }, { err ->
                                //do something with error
                                println("RECEIVED ERROR: $err")
                                Toast.makeText(activity, "Error while editing", Toast.LENGTH_SHORT).show()

                            })

                            fragmentManager?.beginTransaction()
                                    ?.replace(R.id.rootLayout, ProfileFragment())
                                    ?.commit()
                        }
            } else {
                Toast.makeText(activity, "Passwords doesn't match", Toast.LENGTH_SHORT).show()
            }
        }
    }

}