package com.example.area.ui

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.area.R

class KitchenFragment : Fragment() {

    companion object {
        fun newInstance(): KitchenFragment {
            return KitchenFragment()
        }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        println("Kitchen")
        return inflater.inflate(R.layout.fragment_kitchen, container, false)
    }
}
